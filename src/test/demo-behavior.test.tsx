import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { buyerCase } from "@/data/case";
import { nextTask, restoredTasks } from "@/lib/demo-state";
import { searchProperties, validatePropertySearch } from "@/lib/property-search";
import { progressOf, StoreProvider, useStore } from "@/lib/store";
import { formatDate } from "@/lib/i18n";

beforeEach(() => sessionStorage.clear());
describe("Localized date formatting", () => {
  it("keeps appointment text stable across server and browser runtimes", () => {
    expect(formatDate("2026-10-23T10:00:00", "en", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })).toBe("Fri 23 Oct 10:00");
    expect(formatDate("2026-10-23", "pt")).toBe("23/10/2026");
  });
});
describe("Property discovery rules", () => {
  it("filters location", () => expect(searchProperties({ location: "lisbon" }).map(p => p.id)).toEqual(["principe-real-apartment"]));
  it("filters inclusive price range", () => expect(searchProperties({ min: 640000, max: 720000 }).map(p => p.price)).toEqual([640000, 720000]));
  it("filters property type", () => expect(searchProperties({ type: "villa" }).map(p => p.id)).toEqual(["cascais-villa", "lagos-villa"]));
  it("filters minimum bedrooms", () => expect(searchProperties({ beds: 5 }).map(p => p.id)).toEqual(["cascais-villa"]));
  it("requires all selected features", () => expect(searchProperties({ features: "pool,seaView" }).map(p => p.id)).toEqual(["lagos-villa"]));
  it("sorts by price", () => expect(searchProperties({ sort: "priceAsc" }).map(p => p.price)).toEqual([465000,585000,640000,720000,895000,1480000,2350000]));
  it("returns no results for conflicting filters", () => expect(searchProperties({ location: "lisbon", features: "pool" })).toEqual([]));
  it("ignores malformed URL values", () => expect(validatePropertySearch({ location: "bogus", type: "castle", min: -1, max: "Infinity", features: "pool,bogus,pool", sort: "bogus" })).toEqual({ location: undefined, type: undefined, min: undefined, max: undefined, beds: undefined, features: "pool", sort: undefined }));
});
describe("Buyer journey rules", () => {
  it("updates task progress and logs one activity entry", async () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    await waitFor(() => expect(sessionStorage.getItem("ninho-session")).not.toBeNull());
    expect(progressOf(result.current.tasks)).toBe(25);
    act(() => result.current.setTaskStatus("t3", "done"));
    expect(progressOf(result.current.tasks)).toBe(38);
    expect(result.current.activity[0]?.text.en).toBe('“Review land registry certificate” marked as done');
    expect(nextTask(result.current.tasks)?.id).toBe("t4");
  });
  it("persists favourites through remount and logs a single toggle", async () => {
    const first = renderHook(() => useStore(), { wrapper: StoreProvider });
    await waitFor(() => expect(sessionStorage.getItem("ninho-session")).not.toBeNull());
    act(() => first.result.current.toggleFav("cascais-villa", { en: "Villa", pt: "Moradia" }));
    expect(first.result.current.activity.filter(a => a.text.en === "Saved Villa")).toHaveLength(1);
    first.unmount();
    const second = renderHook(() => useStore(), { wrapper: StoreProvider });
    await waitFor(() => expect(second.result.current.isFav("cascais-villa")).toBe(true));
  });
  it("records only one request per property", () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    act(() => result.current.addRequest(buyerCase.propertyId, { en: "Home", pt: "Casa" }));
    act(() => result.current.addRequest(buyerCase.propertyId, { en: "Home", pt: "Casa" }));
    expect(result.current.requested).toEqual([buyerCase.propertyId]);
    expect(result.current.activity.filter(a => a.text.en.includes("Requested information about Home"))).toHaveLength(1);
  });
  it("restores only valid task statuses without replacing sample facts", () => {
    expect(restoredTasks([{ id: "t3", status: "done", title: { en: "fake" } }, { id: "t4", status: "bogus" }])[2]).toEqual({ ...buyerCase.tasks[2], status: "done" });
    expect(restoredTasks([{ id: "t4", status: "bogus" }])[3]?.status).toBe("todo");
  });
  it("has no recommendation when all tasks are done", () => expect(nextTask(buyerCase.tasks.map(t => ({ ...t, status: "done" })))).toBeUndefined());
});
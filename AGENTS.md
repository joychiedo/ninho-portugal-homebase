<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep NINHO demo state browser-local and validate restored records against typed sample data; the prototype must never transmit sensitive inputs.
- Centralize property URL validation and filtering in the search helper so deep links and UI controls use identical rules.
- Derive progress and next recommended tasks from current task state; milestones and document statuses stay illustrative.
- Use accessible dialog primitives for requests and cancel pending demo recording on dismissal so keyboard and cancellation behavior stays reliable.
- Normalize localized date punctuation and use explicit UTC for illustrative appointments so SSR and browser text remain identical.

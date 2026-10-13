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

- Keep the storefront catalogue in a browser-safe static data module and basket state in memory; the showcase does not use a database or accept payments.
- Store uploaded and downloaded store imagery as Lovable Assets pointers; keep the logo-derived favicon as a square raster in public.
- Keep shared storefront views in focused components, with the homepage route composing sections and global CSS defining semantic brand styles.
- Subdirectories have their own AGENTS.md to read before changing files there.

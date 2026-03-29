# Versioning

How changes to the shared component library are classified, communicated, and rolled out to active client projects.

---

## Why this matters

A change to `packages/components` affects every kit and every active client project. There is no isolation — when you update a shared component, all sites get the update on their next deploy. This is the point of the system, but it means a careless change can break multiple live sites at once.

The rules here exist to prevent that.

---

## Two types of change

### Non-breaking

The existing behaviour is preserved. Sites that have not been touched will continue to work identically after rebuilding.

Examples:

- Adding an optional prop with a default value
- Fixing a visual bug (incorrect spacing, wrong token reference)
- Improving performance (replacing a JS behaviour with a CSS equivalent)
- Updating a default value that does not affect sites that have set the prop explicitly
- Accessibility fixes (focus management, ARIA attributes)

Non-breaking changes can be merged and rolled out without contacting clients or auditing every active project.

### Breaking

Sites built against the previous version will need to be updated before rebuilding. A rebuild without updating will produce errors or visual regressions.

Examples:

- Removing a prop
- Renaming a prop
- Changing a prop's type
- Changing a component's expected slot structure
- Removing a component variant
- Changing a token name in `tokens.css`

Breaking changes require a migration plan before merging. See below.

---

## The 6-prop rule and breaking changes

The 6-prop limit per component exists partly to keep components simple and partly to make breaking changes less likely. A component with 4 props has fewer surfaces that can break than one with 12.

If a change seems to require a 7th prop, the right answer is almost always one of:

- A new component variant that handles the specific case
- A kit-level override rather than a system-level change
- A T2 escalation if the requirement is genuinely beyond what the system should handle

Do not work around the prop limit. It is load-bearing.

---

## Making a non-breaking change

1. Make the change on a feature branch — never directly on `main`
2. Test against at least one kit in the dev server — confirm nothing is visually broken
3. Update the props table in `docs/component-library.md`
4. Open a PR. Web lead reviews before merge — no self-merge on shared components, even for junior-accessible fixes
5. After merge, trigger rebuilds for all active client sites (see `docs/deployment.md` — Rebuild section)
6. Verify at least one live client site after rebuild

---

## Making a breaking change

Breaking changes to shared components should be rare. If you find yourself making them regularly, the component was under-designed — fix the design process, not just the component.

When a breaking change is genuinely necessary:

1. **Identify every affected site.** Search the `clients/` directory for every usage of the changed prop or component. Do not rely on memory.
2. **Write the migration steps** before touching any code. What does a developer need to change in a client project to update to the new version? Document this clearly — it becomes the migration note.
3. **Make the change on a branch.** Do not merge until all client projects in the `clients/` directory have been updated on that same branch.
4. **Update all client projects on the branch.** Work through each one. This is tedious — that is intentional. The friction discourages unnecessary breaking changes.
5. **Update `docs/component-library.md`** to reflect the new prop signatures.
6. **Web lead reviews the PR** — including the client-side updates, not just the component change.
7. **Merge and rebuild all sites in one coordinated push.** Do not merge and leave some sites on the old version.

A breaking change that affects 6 active client sites is 6 sites that need updating before the merge. If that feels like too much work, it is a signal that the change is not worth making yet.

---

## Adding a new component

New components are additions, not modifications — they are non-breaking by definition. Existing sites simply do not use the new component until a developer adds it.

The process:

1. Web lead specifies the component — name, props, variants, constraints
2. Build on a feature branch
3. Test against a kit dev server
4. Add the full props reference to `docs/component-library.md` before the PR
5. Web lead reviews and merges
6. No client site rebuilds required — nothing has changed for existing sites

Do not add a new component to solve a single client's one-off requirement. A component belongs in the library if it will be used across multiple kits and multiple projects. If it is genuinely one-off, it belongs in the client project, not the shared library — and that is a conversation with web lead.

---

## Removing a component

Treat as a breaking change. More carefully.

Before removing anything, confirm that no active client project uses the component. Search `clients/` thoroughly. If any site uses it, it cannot be removed until that site is either updated or archived.

Deprecated components that are no longer being added to new projects but are still in use on existing sites should be marked with a comment in the component file:

```astro
---
// DEPRECATED — do not use on new projects. Still in use on: harbor-cafe.
// Removal blocked until harbor-cafe is archived or migrated.
---
```

This makes the dependency visible without forcing an immediate migration.

---

## Token changes

Token name changes in `tokens.css` are breaking changes — treat them as such. Every component that references the token, and every client `theme.css` that sets the token value, needs updating.

Token value changes (not name changes) made in a kit's `theme.css` affect only that project. These are not system changes and do not require the process above.

If you need to add a new token to `tokens.css`, add it with a sensible default value. Existing client projects that do not set it in `theme.css` will fall back to the default. This is non-breaking.

---

## Quick reference

| Change type                         | Breaking?              | web lead review | Rebuild all sites                       |
| ----------------------------------- | ---------------------- | --------------- | --------------------------------------- |
| Add optional prop with default      | No                     | Yes             | Yes                                     |
| Fix a visual bug                    | No                     | Yes             | Yes                                     |
| Rename or remove a prop             | Yes                    | Yes             | Yes — after all client projects updated |
| Change a token name                 | Yes                    | Yes             | Yes — after all client projects updated |
| Add a new component                 | No                     | Yes             | No                                      |
| Remove a component                  | Yes                    | Yes             | Only after all usages removed           |
| Add a new token with default        | No                     | Yes             | Yes                                     |
| Change a token value in `theme.css` | No — client-level only | No              | No — single site only                   |

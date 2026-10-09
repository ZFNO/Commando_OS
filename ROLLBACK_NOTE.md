# ROLLBACK NOTE - do not edit, do not delete, do not commit over

FROZEN. Do NOT modify, move, delete or reformat this file. Reference only.

## Original commits (pre-improvement baseline)

    eca1540   eca1540065d6914779752c00157cf52a577a16f5
              docs: add improvement checklist
              LAST COMMIT BEFORE ANY IMPROVEMENT WORK. Source files here are
              the original, unmodified originals.

    8b29ad1   8b29ad1feee30e3c059d661e23a17deaf2793166
              wip: cardtext formatting before improvements
              One commit earlier, in case eca1540 itself is ever in question.

## Frozen git tags (local)

    baseline-original     -> eca1540
    baseline-formatting   -> 8b29ad1

## Off-repo full backup

    L:/__repo/_C_OS_BASELINE_bundle.git
    Complete git bundle of all history, stored OUTSIDE the repo working tree,
    so no commit or delete inside the repo can affect it.
    Verified: records a complete history.

## How to restore the originals

    git checkout baseline-original -- .
    # or the whole tree:
    git reset --hard baseline-original

## Notes

- Both commits confirmed present, type commit (git cat-file -t), 2026-10-09.
- Nothing was ever pushed to remote ZFNO/Commando_OS. All commits are local only.
- Tags above are local only; not pushed.
- Improvement work happens AFTER eca1540. Reverting to it discards phases 1+.

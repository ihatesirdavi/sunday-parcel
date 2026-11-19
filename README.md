# Sunday Parcel

**An intentionally unrelated codename for one VS Code extension.** This is a fresh, read-only foundation for a future development evidence viewer, NOT a production extension, release or installed VSIX.

## Current source feature

The command **Sunday Parcel: Inspect Local Receipt** inspects the JSON document already open in VS Code. It checks a small receipt schema, CID syntax and Git SHA shape, then displays only the claimed evidence status as **unverified**. No network, filesystem scanning, credentials, source execution or background process is involved.

Synthetic input:

    {
      "schema": "sunday-parcel-receipt-v0",
      "cid": "PROJECT-001",
      "source_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "status_claim": "source-only"
    }

Supported status claims are source-only, native-tested, installed and operational. These words do not verify any claimed runtime status.

## Design principles

Single-purpose command, minimal VS Code interface, typed validation, and separate source/native/installed evidence. Useful ideas and document structure were recovered from an earlier owner-controlled extension experiment, but no legacy Git history, logo or implementation files were copied into this repository.

## Source tests

Requires Node.js 22; no package download needed.

    npm test
    npm run check

## Evidence and next steps

| Layer | Current status |
| --- | --- |
| Node parser and mock VS Code host | Source tests |
| Actual VS Code extension host | NOT_RUN |
| VSIX package / installed extension | NOT_BUILT / NOT_INSTALLED |
| Original source ownership verification | NOT_IMPLEMENTED |
| External application integration | NOT_CONNECTED |
| Marketplace listing / public binary | NOT_RELEASED |

Next: reconcile the original FE/MINT/BE evidence contract, then test this in a genuine VS Code extension host and inspect the visible command interface before packaging. Do not create duplicate runners, registries or credential stores.

**Provenance:** Agent-assisted source implementation under owner-directed human oversight and fact checking. A public code repository is not authorization to publish unrelated private sources or media.

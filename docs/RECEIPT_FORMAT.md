# Local JSON receipt format (prototype v0)

Read only the active editor document. No file traversal.

| Field | Requirement |
| --- | --- |
| schema | sunday-parcel-receipt-v0 |
| cid | Uppercase dash-separated identifier, up to 80 characters |
| source_sha | 40 hexadecimal characters, no Git lookup |
| status_claim | source-only, native-tested, installed, operational |

Maximum 128 KiB UTF-8. Reject malformed and unsupported input. Extra fields are ignored in output. All input is **untrusted**; validation checks shape, not author signatures, rights, source existence or installed behavior.

This is NOT the governing FE/MINT/BE receipt schema. A future adapter requires original owner-approved evidence and native test receipts.

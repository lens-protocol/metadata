# @lens-protocol/metadata

## 0.1.0-alpha.21

### Patch Changes

- 9db94c5: **fix:** simplifies `MirrorMetadata` and removes `globalReach` across the board
- 645e78d: **fix:** `AnyMedia` discriminated union validation
- ba502d1: **feat:** adds `shortVideo` builder and small fix

## 0.1.0-alpha.20

### Patch Changes

- 308e702: **refactor:** makes the lib TS typedef first

## 0.1.0-alpha.19

### Patch Changes

- 5d0a2a9: **Fixes** minor mismatches with legacy spec

## 0.1.0-alpha.18

### Patch Changes

- 2a6ae84: **Fixed** `MarketplaceMetadataAttribute` property names

## 0.1.0-alpha.17

### Patch Changes

- 8d1f2b1: **Added** docs generated with typedocs

## 0.1.0-alpha.16

### Patch Changes

- b111da8: **Added** metadata builder functions

## 0.1.0-alpha.15

### Patch Changes

- 809643a: **Added** support for encryptable fields
- faf84e4: **Fixed** `StoryMetadata.attachments` (removed)

## 0.1.0-alpha.14

### Patch Changes

- 9be5eeb: **Added** `GeoURI` and `Address` for better targeting o `EventMetadata` and `CheckingInMetadata`
- d0cd540: **Fixed** `NftOwnershipCondition` to include ERC-1155 limitations around token IDs
- 7191ce1: **Fixed** too strict engines directive"

## 0.1.0-alpha.13

### Patch Changes

- f1ff3a3: **Fixed** `MirrorSchema` id, location, generated JSON schema"

## 0.1.0-alpha.12

### Patch Changes

- cb7ed1a: **Added** `ProfileMetadata.lens.appId`
- e966e85: **Fixed** missing `title`, wrong `altTag`, and adds `EncryptedPaths`
- f071212: **Fixed** `AnyMediaSchema` union and `ThreeDAsset.assets` name
- 74242d1: **Added** `MirrorMetadataSchema`

## 0.1.0-alpha.11

### Patch Changes

- eec20a1: **Fixed** TS4023 error while using `legacy` namespace by moving content under `@lens-protocol/metadata/legacy` entry point
- 691847a: **Fixed** missing `EncryptionParams.encryptedFields` rules and typedef
- b72c6e4: **Fixed** missing properties in `TransactionMetadata` and `SpaceSchema`

## 0.1.0-alpha.10

### Patch Changes

- a75cf84: **Fixed** `Amount.currency > Amount.asset`

## 0.1.0-alpha.9

### Patch Changes

- 5af6230: **Added** `type` to `AccessCondition`(s)

## 0.1.0-alpha.8

### Patch Changes

- 6cab78d: **Added** `extractVersion` convenience helper
- 3480452: **Fixed** Publication Metadata v3 strict rule around non-empty Marketplace attributes
- cb70c63: **Fixed** `AccessCondition` and `legacy.AccessCondition` inference
- d1fc6d4: **Fixed** all pub metadata schema to start from 3.0.0 and profile metadata schema from 2.0.0

## 0.1.0-alpha.7

### Patch Changes

- a8e465d: **Added** support for Profile metadata v1

## 0.1.0-alpha.6

### Patch Changes

- cf7bfaa: **Added** support for legacy Publication Metadata v1 and v2

## 0.1.0-alpha.5

### Patch Changes

- ee041cf: **Fixed** `PublicationMetadataMetadata` typo

## 0.1.0-alpha.4

### Patch Changes

- 3f3c349: **Added** versioning strategy
- d643054: **Added** support for token-gated publications

## 0.1.0-alpha.3

### Patch Changes

- 5e152b0: **Fixes** tsconfig so to not need tslib

## 0.1.0-alpha.2

### Patch Changes

- 406238b: **Added** `ProfileMetadataSchema` and several other improvements

## 0.1.0-alpha.1

### Patch Changes

- 3569b6d: **Added** `formatZodError`, datetimes instead of unix timestamps and future proof events datetimes

## 0.1.0-alpha.0

### Minor Changes

- 3baeab5: **Added** first iteration over LIP-2 spec

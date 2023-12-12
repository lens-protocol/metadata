# @lens-protocol/metadata

## 1.1.3

### Patch Changes

- 45f384b: **fixed:** `OpenActionMetadataSchema` reflects latest decisions on the process/API side
- 03c3b03: **fixed:** fields with non-empty string validation to perform a robust value trimming before evaluating the rules
- a41559c: **fixed:** `PublicationMetadata` validation in case of empty `description` or empty `lens.content` for optional content pub types

## 1.1.2

### Patch Changes

- e508560: **fixed** legacy PublicationMetadata schema not supporting SHORT_VIDEO main content focus

## 1.1.1

### Patch Changes

- 9d21384: **fix:** use `MetadataAttribute` in open action metadata

## 1.1.0

### Minor Changes

- 880b7b5: **feat:** adds Open Action Metadata Standards

### Patch Changes

- 312cdff: **fixed:** parse legacy `lenstube-bytes`` videos as SHORT_VIDEO
- 39005b4: **fixed:** documentation typos and omitted details from LIP

## 1.0.5

### Patch Changes

- cff8bac: **fix** makes Locale parsing more robust

## 1.0.4

### Patch Changes

- 61ef350: **fix** legacy nft ownership condition so that empty `tokenIds` resolves as `null`
- e4c987a: **fix:** honour publication metadata that despite being invalid did got through Lens v1/2 validation logic

## 1.0.3

### Patch Changes

- e791e7f: **fix** legacy support for relaxed token-gated nft condition

## 1.0.2

### Patch Changes

- c1231a8: **fix:** legacy `ProfileMetadataSchema` to be more loose

## 1.0.1

### Patch Changes

- e651a74: **fix:** legacy `PublicationMetadataSchema` and `ProfileMetadataSchema` to replicate old discrepancies

## 1.0.0

### Major Changes

- 55dc2bf: First major release

### Minor Changes

- 3baeab5: **Added** first iteration over LIP-2 spec

### Patch Changes

- 3f3c349: **Added** versioning strategy
- 9a71023: **fix:** missing `TransactionMetadataDetails` with `PublicationMetadataCommon`
- 9db94c5: **fix:** simplifies `MirrorMetadata` and removes `globalReach` across the board
- 2a6ae84: **Fixed** `MarketplaceMetadataAttribute` property names
- 809643a: **Added** support for encryptable fields
- a1a8199: **feat:** new access condition builders
- 286daa4: **fix:** `orCondition` and `andCondition` input type
- e9808e6: **Added** `GeoURI` and `Address` for better targeting o `EventMetadata` and `CheckingInMetadata`
- 6cab78d: **Added** `extractVersion` convenience helper
- 1cacc5a: **chore:** creates internal `accessCondition` builder
- 3480452: **Fixed** Publication Metadata v3 strict rule around non-empty Marketplace attributes
- cb70c63: **Fixed** `AccessCondition` and `legacy.AccessCondition` inference
- 3569b6d: **Added** `formatZodError`, datetimes instead of unix timestamps and future proof events datetimes
- 5e152b0: **Fixes** tsconfig so to not need tslib
- a75cf84: **Fixed** `Amount.currencty > Amount.asset`
- cb7ed1a: **Added** `ProfileMetadata.lens.appId`
- eec20a1: **Fixed** TS4023 error while using `legacy` namespace by moving content under `@lens-protocol/metadata/legacy` entry point
- a8e465d: **Added** support for Profile metadata v1
- b76078c: **fix:** non-optional `locale: Locale`
- d0cd540: **Fixed** `NftOwnershipCondition` to include ERC-1155 limitations around token IDs
- 691847a: **Fixed** missing `EncryptionParams.encryptedFields` rules and typedef
- f3acec1: **fix:** `ArticleMetadata.content` non optional
- faf84e4: **Fixed** `StoryMetadata.attachments` (removed)
- 645e78d: **fix:** `AnyMedia` discriminated union validation
- e966e85: **Fixed** missing `title`, wrong `altTag`, and adds `EncryptedPaths`
- 5d0a2a9: **Fixes** minor mismatches with legacy spec
- d1fc6d4: **Fixed** all pub metadata schema to start from 3.0.0 and profile metadata schema from 2.0.0
- f071212: **Fixed** `AnyMediaSchema` union and `ThreeDAsset.assets` name
- ee041cf: **Fixed** `PublicationMetadataMetadata` typo
- 4bb1bc8: **fix:** legacy publication parse to accept fields as per past behavior
- f14e899: **fix:** adds missing `EventSchema.title`
- b111da8: **Added** metadata builder functions
- 7191ce1: **Fixed** too strict engines directive
- b72c6e4: **Fixed** missing properties in `TransactionMetadata` and `SpaceSchema`
- d643054: **Added** support for token-gated publications
- f1ff3a3: **Fixed** `MirrorSchema` id, location, generated JSON schema"
- f0897dc: **fix:** missing `MintMetadata.attachments`
- 74242d1: **Added** `MirrorMetadataSchema`
- 2d8869d: **feat:** implements new limits
- ba502d1: **feat:** adds `shortVideo` builder and small fix
- 308e702: **refactor:** makes the lib TS typedef first
- 8d1f2b1: **Added** docs generated with typedocs
- 4af411a: **fixed:** encrypted value regexp
- cf7bfaa: **Added** support for legacy Publication Metadata v1 and v2
- 5af6230: **Added** `type` to `AccessCondition`(s)
- 810b568: **fix:** consolidated `erc20OwnershipCondition` signature
- 406238b: **Added** `ProfileMetadataSchema` and several other improvements
- e5fef24: **feat:** adds advanced contract condition

## 0.1.0-alpha.31

### Patch Changes

- f14e899: **fix:** adds missing `EventSchema.title`

## 0.1.0-alpha.30

### Patch Changes

- 810b568: **fix:** consolidated `erc20OwnershipCondition` signature
- e5fef24: **feat:** adds advanced contract condition

## 0.1.0-alpha.29

### Patch Changes

- 286daa4: **fix:** `orCondition` and `andCondition` input type
- 1cacc5a: **chore:** creates internal `accessCondition` builder

## 0.1.0-alpha.28

### Patch Changes

- a1a8199: **feat:** new access condition builders

## 0.1.0-alpha.27

### Patch Changes

- 4bb1bc8: **fix:** legacy publication parse to accept fields as per past behavior

## 0.1.0-alpha.26

### Patch Changes

- 2d8869d: **feat:** implements new limits

## 0.1.0-alpha.25

### Patch Changes

- f0897dc: **fix:** missing `MintMetadata.attachments`

## 0.1.0-alpha.24

### Patch Changes

- f3acec1: **fix:** `ArticleMetadata.content` non optional

## 0.1.0-alpha.23

### Patch Changes

- b76078c: **fix:** non-optional `locale: Locale`

## 0.1.0-alpha.22

### Patch Changes

- 9a71023: **fix:** missing `TransactionMetadataDetails` with `PublicationMetadataCommon`

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

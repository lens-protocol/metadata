import { describe, expect, it } from 'vitest';

import { feedRule, graphRule } from '../rules.js';

describe('Given the rule metadata builders', () => {
  describe(`when using the '${feedRule.name}'`, () => {
    it('should return a valid FeedRuleMetadata', () => {
      const metadata = feedRule({
        name: 'MyFeedRule',
        description: 'Get ready for the future of social interaction!',
        authors: ['awesome-dev@lens.xyz'],
        source: 'https://github.com/foobarbaz/my-open-action',
        configureParams: [],
        processCreatePostParams: [
          {
            key: '0x83b03721c31435de384ca9cc3799cdfa10e19123e6a48dbf11589e36a0ef0b95',
            name: 'recipient',
            type: 'address',
          },
          {
            key: '0xe4ddce99520beb836fc879fc2a7d0743f784ffb925f96544bb5ff27c441c8c99',
            name: 'fee',
            type: 'address token, uint256 value',
          },
        ],
        processEditPostParams: [],
        processRemovePostParams: [],
        processPostRuleChangesParams: [],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });

  describe(`when using the '${graphRule.name}'`, () => {
    it('should return a valid GraphRuleMetadata', () => {
      const metadata = graphRule({
        name: 'MyGraphRule',
        description: 'Get ready for the future of social interaction!',
        authors: ['awesome-dev@lens.xyz'],
        source: 'https://github.com/foobarbaz/my-open-action',
        configureParams: [],
        processFollowParams: [
          {
            key: '0x83b03721c31435de384ca9cc3799cdfa10e19123e6a48dbf11589e36a0ef0b95',
            name: 'recipient',
            type: 'address',
          },
          {
            key: '0xe4ddce99520beb836fc879fc2a7d0743f784ffb925f96544bb5ff27c441c8c99',
            name: 'fee',
            type: 'address token, uint256 value',
          },
        ],
        processUnfollowParams: [],
        processFollowRuleChangesParams: [],
      });

      expect(metadata).toMatchSnapshot({
        lens: {
          id: expect.any(String),
        },
      });
    });
  });
});

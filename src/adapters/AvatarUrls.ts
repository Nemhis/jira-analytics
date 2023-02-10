import { Raw } from '@/@types/Raw';

export default class AvatarUrls {
  size48: string;
  size32: string;
  size24: string;
  size16: string;

  constructor(raw: Raw) {
    this.size24 = raw['24x24'];
    this.size32 = raw['32x32'];
    this.size48 = raw['48x48'];
    this.size16 = raw['16x16'];
  }

  static fromRaw(raw: Raw): AvatarUrls {
    return new AvatarUrls(raw);
  }
}

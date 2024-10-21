export interface NavItem {
  _id: string;
  title: string;
  link?: string | null;
  linkType: 'internal' | 'external';
  internalLinkType?: string;
  externalLink?: string;
}
export interface NavLinkTypes {
  id: number;
  title: string;
  route: string;
}

export interface NavDataTypes extends NavLinkTypes {
  children: NavLinkTypes[];
}

export interface FooterDataTypes {
  id: number;
  title: string;
  children: {
    id: number;
    title: string;
    route: string;
  }[];
}

export interface ReviewTypes {
  name: string;
  location: string;
  message: string;
  imageSrc: string;
  imageAlt: string;
}

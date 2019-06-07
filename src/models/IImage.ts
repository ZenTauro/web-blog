export default interface IImage {
  childImageSharp: IChildImageSharp;
}

interface IChildImageSharp {
  fixed: IBase64;
  fluid: IBase64;
}

interface IBase64 {
  base64: string;
}

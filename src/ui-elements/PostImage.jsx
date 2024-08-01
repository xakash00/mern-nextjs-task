import Image from "next/image";
import styled from "@emotion/styled";

const ImageWrap = styled.span`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
  }
`;

const PostImage = ({ alt, src, width, height, h, pos }) => {

  return (
    <ImageWrap>
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        quality={70}
        priority={true}
        className={`w-[${width}px] h-[${h === true ? height : "auto"}px] object-cover`}
      // onLoadingComplete={() => setLoaded(true)}
      />
      {/* {!loaded && (
        <Skeleton
          sx={{ bgcolor: 'grey.100' }}
          variant="rectangular"
          width="100%"
          height="100%"
        />
      )} */}

    </ImageWrap>
  );
};

export default PostImage;
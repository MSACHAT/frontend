import './postImgStyle.scss';
import { Image, ImagePreview } from '@douyinfe/semi-ui';
export const PostImgs = ({ imgUrls }) => {
  if (!imgUrls.length) {
    return null;
  }
  console.log(imgUrls);
  return (
    <ImagePreview className={'image-container'}>
      {imgUrls.map((x, index) => (
        <div className={'image-item'}>
          <Image className={'image'} src={x} id={index} />
        </div>
      ))}
    </ImagePreview>
  );
};

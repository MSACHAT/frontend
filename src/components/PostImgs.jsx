import './postImgStyle.scss';
import { Image, ImagePreview } from '@douyinfe/semi-ui';
export const PostImgs = ({ imgUrls }) => {
  
  if (!imgUrls.length) {
    return null;
  }
  console.log(imgUrls);
  return (
    <ImagePreview
      className={`image-container ${imgUrls.length === 1 && 'container-1'} ${
        imgUrls.length < 5 && imgUrls.length > 1 && 'container-less-than-5'
      }`}
      lazyLoad={false}
    >
      {imgUrls.map((x, index) => (
        <div className={'image-item'}>
          <Image className={'image'} src={x} id={index} />
        </div>
      ))}
    </ImagePreview>
  );
};

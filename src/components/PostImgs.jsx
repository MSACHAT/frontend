import './postImgStyle.scss';
import { Image } from '@douyinfe/semi-ui';
export const PostImgs = ({ imgUrls }) => {
  if (!imgUrls.length) {
    return null;
  }
  console.log(imgUrls);
  return (
    <div className={'image-container'}>
      {imgUrls.map((x, index) => (
        <Image src={x} className={'image'} id={index} />
      ))}
    </div>
  );
};

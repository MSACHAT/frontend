import './postImgStyle.scss';
import { Image, ImagePreview } from '@douyinfe/semi-ui';
import { useLocation } from 'react-router-dom';

export const PostImgs = ({ imgUrls }) => {
  const location = useLocation();

  const isPostPage = () => {
    // 检查当前路径是否符合特定模式
    const pathRegex = /^\/post\/[^\/]+$/; // 正则表达式匹配 /post/:postId 模式
    return pathRegex.test(location.pathname);
  };
  if (!imgUrls?.length) {
    return null;
  }
  return isPostPage() ? (
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
  ) : (
    <ImagePreview
      className={`image-container ${imgUrls.length === 1 && 'container-1'} ${
        imgUrls.length < 5 && imgUrls.length > 1 && 'container-less-than-5'
      }`}
      lazyLoad={false}
      visible={false}
    >
      {imgUrls.map((x, index) => (
        <div className={'image-item'}>
          <Image className={'image'} src={x} id={index} />
        </div>
      ))}
    </ImagePreview>
  );
};

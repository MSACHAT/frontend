import React, { useMemo, useCallback } from 'react';
import { Image, ImagePreview, Button } from '@douyinfe/semi-ui';
import { IconCamera } from '@douyinfe/semi-icons';

export const AvatarComponent = ({ avatarUrl }) => {
  const srcList = useMemo(() => [avatarUrl], []);

  const renderPreviewMenu = useCallback(() => {
    return (
      <div>
        <Button icon={<IconCamera size="large" />} />
      </div>
    );
  }, []);

  return (
    <ImagePreview renderPreviewMenu={renderPreviewMenu}>
      {srcList.map((src, index) => {
        return (
          <Image
            key={index}
            src={src}
            width={200}
            alt={`lamp${index + 1}`}
            style={{ marginRight: 5 }}
          />
        );
      })}
    </ImagePreview>
  );
};

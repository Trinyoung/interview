'use client';

import { useEffect } from 'react';

// import vconsole from 'vconsole';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // new vconsole();
    console.error('页面加载出错：', error);
  }, [error]);

  return (
    <div className="pt-[150px]">
      <div className="text-center text-lg">遇到了一些错误</div>
      <div
        className="mx-auto mt-md h-[36px] w-[150px] rounded-sm border-[1px] border-solid border-cb-2-2 px-lg py-md text-center text-md font-medium leading-[20px] text-cb-2-1"
        onClick={() => reset()}
      >
        点击重试
      </div>
    </div>
  );
}

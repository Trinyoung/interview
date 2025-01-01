// 提供静态路径
export async function generateStaticParams() {
    return [
      { id: '1' },
      { id: '2' },
    ];
  }
  
  // 获取静态内容
  async function fetchPost(id: string) {
    return {
      id,
      title: `Post ${id}`,
      content: 'This is static content.',
    };
  }
  
  // 渲染静态页面
  export default async function BlogPost({ params }: {params: {id: string}}) {
    const post = await fetchPost(params.id);
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
  }
  
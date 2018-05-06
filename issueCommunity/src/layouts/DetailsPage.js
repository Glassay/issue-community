/**
 * 2018-05-06 Glassay
 * 详细内容页面
 */

import React from 'react';
import { Layout, Button, Divider } from 'antd';

import styles from './BasicLayout.less';
import Comment from '../components/Comment/Comment';

const { Content, Header, Footer } = Layout;

class DetailsPage extends React.Component {
  render() {
    return(
      <Layout>
        <Header className={styles.header}>
          <span className={styles.title}>论题研讨</span>
          <span className={styles.login}>登录</span>
          <Button type="primary" className={styles.register}>注册</Button>
        </Header>
        <Content className={styles.content}>
          <h2>一个抑郁症患者的独白</h2>
          <article>最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。</article>
          <Divider />
          <Comment />
          <Comment />
          <Comment />
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default DetailsPage;

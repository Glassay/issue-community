/**
 * 2018-05-06 Glassay
 * 单篇文章
 */

import React from 'react';
import { List, Avatar, Icon } from 'antd';

import styles from './SingleArticls.less';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `一位抑郁症患者的独白${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class SingleArticle extends React.Component {
  render() {
    return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRwvtnOwp0gVJ9tOOWFh7jUcOj7_Q-sbD8cR303orbyJNFF1C6" />}
              title={<a className={styles.title} href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}

export default SingleArticle;

/**
 * 2018-05-06
 * 评论组件
 */

import React from 'react';
import { Avatar, Divider } from 'antd';

import styles from './Comment.less';

class Comment extends React.Component {
  render() {
    return(
      <div className={styles.layout}>
        <div className={styles.head}>
          <Avatar size="large" src="http://file5.u148.net/2015/07/images/14373784924538J3J6KEQ3.jpg" />
          <div className={styles.name}>
            <em>林荫蛮</em>
            <span>2018-05-06</span>
          </div>
        </div>
        <article>真正的写作，是一件很纯粹的事，是一种单纯的喜爱、洁净的创作，无关酬劳，无关声誉，无关结果，所有的意义，都在字里行间，都在那个纯粹的过程里。</article>
        <Divider />
      </div>
    );
  }
}

export default Comment;

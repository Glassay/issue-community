import React from 'react';
import { Modal } from 'antd';

import styles from './Images.less';

class Images extends React.Component {
  state = {
    visible: false,
    i: null
  }

  showModal = (i) => {
    this.setState({
      visible: true,
      i: i
    });
    console.log('index>>>>', i);
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const imgs = [
      'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-473716.jpg',
      'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-371371.jpg',
      'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-365712.png'
    ]
    return(
      <div className={styles.layout}>
        {
          imgs.map((item, index) => (
            <div key={index}>
              <img onClick={() => this.showModal(index)} style={{ padding: 10 }} height="150px" width="150" src={item} alt="" />
            </div>
          ))
        }
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="70%"
          footer={null}
        >
          <img src={imgs[this.state.i]} height="100%" width="100%" alt="" />
        </Modal>
      </div>
    );
  }
}

export default Images;

import React from 'react';
import { Modal, Icon } from 'antd';

export default class Videos extends React.Component {
  state = {
    visible: false,
    Medias: null
  }

  componentDidUpdate() {
    const Media = document.getElementsByTagName('video')[0];
    console.log('Midia>>>>', Media);
    if(Media !== undefined) {
      Media.pause();
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return(
      <div>
        <Icon onClick={this.showModal} style={{ fontSize: 30, color: '#EC7700' }} type="video-camera" />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          bodyStyle={{
            backgroundColor: 'black'
          }}
          width="63%"
          footer={null}
        >
          <video
            id="media"
            // src="http://p7knynd79.bkt.clouddn.com/ligSrF9j7Z_BOQvT0D7WD_n9iKp8"
            src={this.props.video}
            poster="posterimage.jpg"
            controls="controls"
          >
            抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a href={this.props.video}>下载</a>
            并用你喜欢的播放器观看!
          </video>
        </Modal>
      </div>
    );
  }
}

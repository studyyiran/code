import React, { useState } from "react";
import "./index.less";
import Modal from "../../../../components/modal";

export default function ChangeUserInput(props: any) {
  const { tag, displayContent, renderInnerContent } = props;
  const [showModal, setShowModal] = useState(false);
  if (!displayContent) {
    return null;
  }
  return (
    <div className="change-user-container">
      <div className="left">
        <span className="tag">{tag}</span>
        <span className="content">{displayContent}</span>
      </div>
      {!props.hideChange ? (
        <div
          className="change-button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Change
        </div>
      ) : null}
      <Modal
        maskClosable={false}
        needDefaultScroll={true}
        className="change-user-modal"
        visible={showModal}
        title=""
        width={530}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {renderInnerContent(() => {
          setShowModal(false);
        })}
      </Modal>
    </div>
  );
}

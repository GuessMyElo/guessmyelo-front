import React from "react";
import {
  Modal as ReactModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Button from "../Button/Button";

const Modal = ({ title, children, isOpen, toggle, validate }) => {
  return (
    <ReactModal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button onClick={validate}></Button>
      </ModalFooter>
    </ReactModal>
  );
};

export default Modal;

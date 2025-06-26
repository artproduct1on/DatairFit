import { Dispatch, SetStateAction } from "react";

export interface HeaderMenuProps {
  anchorElUser: Element | null;
  setAnchorElUser: Dispatch<SetStateAction<Element | null>>;
};

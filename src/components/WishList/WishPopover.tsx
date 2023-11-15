import React, {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon, regular, solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {useNavigate} from "react-router-dom";
import {Popover, Typography} from "@mui/material";
import {ItemType} from "../../types/ItemType";

const WishPopover = (props: Iprops) => {
  const {item} = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <div className={'item-self-icons'} onClick={handleClick}>
        <FontAwesomeIcon icon={solid("circle-info")} size={'lg'}/>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{p: 2}}>
          {item.link ? <a href={item.link} target={'_blank'}>{item.link}</a> : null}
          {item.notes ? <div>{item.notes}</div> : null}
        </Typography>
      </Popover>
    </React.Fragment>
  )
}

interface Iprops {
  item: ItemType;
}

export default WishPopover;

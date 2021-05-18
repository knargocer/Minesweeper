import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import WhatshotIcon from '@material-ui/icons/Whatshot';

export default function Cell({ data, updateBoard, flagCell }) {
  const style = {
    block: {
      width: 40,
      height: 40,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 800,
      fontSize: 30,
      cursor: 'pointer',
      border: 'solid black' ,
      background: data.shown
        ? data.value === 'X' 
          ? 'rgb(0,255,255)'
          : 'rgb(60,29,98)'
        : 'rgb(255,128,150)',
    },
  };

  const onClickUpdate = (e) => {
    if (data.flagged) {
      return;
    }
    console.log(e.type);
    updateBoard(data.x, data.y);
  };

  const onClickFlag = (e) => {
    e.preventDefault();
    flagCell(data.x, data.y);
  };

  return (
    <div
      style={style.block}
      onClick={(e) => onClickUpdate(e)}
      onContextMenu={(e) => onClickFlag(e)}
    >
      {data.flagged && !data.shown ? (
        <FlagIcon />
      ) : data.shown && data.value !== 0 ? (
        data.value === 'X' ? (
          <WhatshotIcon/>
        ) : (
          data.value
        )
      ) : (
        ''
      )}
    </div>
  );
}



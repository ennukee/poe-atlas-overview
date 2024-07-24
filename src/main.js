import React, { useMemo } from 'react'
import { Box, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './main.css';

const initialState = {
  abyss: false,
  alva: false,
  bestiary: false,
  beyond: false,
  blight: false,
  breach: false,
  delirium: false,
  delve: false,
  essence: false,
  expedition: false,
  harbinger: false,
  harvest: false,
  heist: false,
  jun: false,
  kirac: false,
  legion: false,
  ritual: false,
  rogue_exiles: false,
  scarab: false,
  shrine: false,
  strongbox: false,
  torment: false,
  ultimatum: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        [action.toggle]: !state[action.toggle]
      };
    case 'ENABLE_ALL':
      return Object.keys(state).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
    case 'DISABLE_ALL':
      return {...initialState};
    default:
      return state;
  }
}

export default function Main() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [transparency, setTransparency] = React.useState(80);

  const menuValues = useMemo(() =>
    Object.keys(state).filter(key => state[key]), [state]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activeParams = urlParams.get('active');
    const transparencyParam = urlParams.get('transparency');

    if (activeParams) {
      console.log(activeParams);
      const activeKeys = activeParams.split(',');

      activeKeys.forEach((key) => {
        dispatch({ type: 'TOGGLE', toggle: key });
      });
    }

    if (transparencyParam) {
      const transparencyValue = parseInt(transparencyParam, 10);
      if (!isNaN(transparencyValue)) {
        setTransparency(transparencyValue);
      }
    }
  }, []);

  React.useEffect(() => {
    const activeParams = Object.keys(state).filter((key) => state[key]).join(',');
    const queryParams = new URLSearchParams();
    queryParams.append('active', activeParams);
    queryParams.append('transparency', transparency.toString());
    const url = new URL(window.location.href);
    url.search = queryParams.toString();
    window.history.replaceState(null, '', url.toString());
  }, [state, transparency]);

  return <>
    <div className="menu">
      <ToggleButtonGroup
        size="small"
        color="warning"
        orientation="vertical"
        value={menuValues}
      >
        {Object.keys(state).map((key) => (
          <ToggleButton
            key={key}
            value={key}
            onClick={() => dispatch({ type: 'TOGGLE', toggle: key })}
          >
            {key.replace('_', ' ')}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '10px',
          height: '400px',
        }}
      >
        <Visibility color="warning" />
        <Slider
          color="warning"
          className="transparency-slider"
          value={transparency}
          onChange={(_, value) => setTransparency(value)}
          min={0}
          max={100}
          step={10}
          orientation="vertical"
        />
        <VisibilityOff color="warning" />
      </Box>
    </div>
    <div className="container">
      <div className="background image active" />
      {Object.keys(state).map((key) => (
        <Box
          sx={{
            filter: `opacity(${state[key] ? transparency / 100 : 0})`
          }}
          key={key}
          className={`image ${key} ${state[key] ? 'active' : ''}`}
        />
      ))}
    </div>
  </>;
}

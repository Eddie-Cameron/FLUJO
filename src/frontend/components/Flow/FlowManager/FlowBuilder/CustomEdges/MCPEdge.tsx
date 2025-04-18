"use client";

import React, { FC } from 'react';
import { 
  EdgeProps, 
  getSmoothStepPath, 
  BaseEdge, 
  EdgeLabelRenderer,
  Position,
  MarkerType
} from '@xyflow/react';
import { styled, useTheme } from '@mui/material/styles';

const EdgeButton = styled('button')(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  borderRadius: '50%',
  fontSize: '10px',
  width: '20px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.primary,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 2px 4px rgba(0,0,0,0.3)' 
    : '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 2px 6px rgba(0,0,0,0.4)' 
      : '0 2px 6px rgba(0,0,0,0.2)',
    background: theme.palette.mode === 'dark' 
      ? theme.palette.action.hover 
      : theme.palette.background.paper,
  }
}));

const EdgePath = styled(BaseEdge)(({ theme }) => ({
  '&.animated': {
    strokeDasharray: 5,
    animation: 'flowPathAnimation 0.5s infinite linear',
  },
  '@keyframes flowPathAnimation': {
    '0%': {
      strokeDashoffset: 10,
    },
    '100%': {
      strokeDashoffset: 0,
    },
  }
}));

const MCPEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected
}) => {
  // Default values for edge path
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: sourcePosition || Position.Left,
    targetX,
    targetY,
    targetPosition: targetPosition || Position.Right,
    borderRadius: 16
  });

  const theme = useTheme();
  
  // MCP edge style - using theme colors
  const edgeStyle = {
    ...style,
    strokeWidth: selected ? 3 : 2,
    stroke: selected 
      ? theme.palette.info.light 
      : theme.palette.info.main, // Use theme info color for MCP connections
  };

  return (
    <>
      <EdgePath 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={edgeStyle} 
        id={id}
        className="" // No animation
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            zIndex: 1000,
          }}
          className="nodrag nopan"
        >
          <EdgeButton title="Delete connection">×</EdgeButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default MCPEdge;

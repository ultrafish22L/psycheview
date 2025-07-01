import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const TileContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
`;

const Tile = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;
`;

const TILE_SIZE = 1024;
const BUFFER_TILES = 1; // Number of tiles to load beyond visible area

export function InfiniteCanvas({ 
  initialImage,
  scale = 1,
  position = { x: 0, y: 0 },
  onPositionChange,
  onScaleChange 
}) {
  const containerRef = useRef(null);
  const [tiles, setTiles] = useState(new Map());
  const [visibleArea, setVisibleArea] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  });

  // Calculate which tiles should be visible
  const calculateVisibleTiles = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Convert screen coordinates to world coordinates
    const worldLeft = (position.x - rect.width / 2) / scale;
    const worldTop = (position.y - rect.height / 2) / scale;
    const worldRight = (position.x + rect.width / 2) / scale;
    const worldBottom = (position.y + rect.height / 2) / scale;

    // Calculate tile indices
    const startTileX = Math.floor(worldLeft / TILE_SIZE) - BUFFER_TILES;
    const startTileY = Math.floor(worldTop / TILE_SIZE) - BUFFER_TILES;
    const endTileX = Math.ceil(worldRight / TILE_SIZE) + BUFFER_TILES;
    const endTileY = Math.ceil(worldBottom / TILE_SIZE) + BUFFER_TILES;

    // Update visible area
    setVisibleArea({
      left: startTileX * TILE_SIZE,
      top: startTileY * TILE_SIZE,
      right: endTileX * TILE_SIZE,
      bottom: endTileY * TILE_SIZE
    });

    // Create new tiles Map
    const newTiles = new Map();
    for (let y = startTileY; y <= endTileY; y++) {
      for (let x = startTileX; x <= endTileX; x++) {
        const key = `${x},${y}`;
        newTiles.set(key, {
          x: x * TILE_SIZE,
          y: y * TILE_SIZE,
          image: tiles.get(key)?.image || initialImage
        });
      }
    }
    setTiles(newTiles);
  };

  // Handle pan/zoom changes
  useEffect(() => {
    calculateVisibleTiles();
  }, [scale, position.x, position.y]);

  // Handle mouse/touch events for panning
  const handleMouseDown = (e) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Handle wheel events for zooming
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(10, scale * delta));
    onScaleChange(newScale);
  };

  return (
    <Canvas
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <TileContainer
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
        }}
      >
        {Array.from(tiles.values()).map((tile) => (
          <Tile
            key={`${tile.x},${tile.y}`}
            $size={TILE_SIZE}
            style={{
              left: `${tile.x}px`,
              top: `${tile.y}px`,
              backgroundImage: `url(${tile.image})`
            }}
          />
        ))}
      </TileContainer>
    </Canvas>
  );
}
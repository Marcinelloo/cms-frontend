import React from "react";
import styled from "styled-components";
import {COLOR_PALETTES, COLORS} from "@/common/colors/colors";

const ColorPaletteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ColorPaletteOption = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  max-width: 750px;
  min-width: 700px;
`;

const ColorCircle = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({color}) => color};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:after {
    content: "${({name}) => name}";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const SelectButton = styled.button`
  padding: 8px;
  background-color: ${COLORS.first};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const colorPalettes = [
    {
        id: "palette1",
        colors: [
            COLOR_PALETTES.palette1.first,
            COLOR_PALETTES.palette1.second,
            COLOR_PALETTES.palette1.accent,
            COLOR_PALETTES.palette1.lightGrey,
            COLOR_PALETTES.palette1.darkDarkGreen,
            COLOR_PALETTES.palette1.darkGreen,
            COLOR_PALETTES.palette1.green,
            COLOR_PALETTES.palette1.grey,
            COLOR_PALETTES.palette1.darkGrey,
            COLOR_PALETTES.palette1.description,
            COLOR_PALETTES.palette1.yellow,
            COLOR_PALETTES.palette1.red,
            COLOR_PALETTES.palette1.navigation,
        ],
    },

    {
        id: "palette2",
        colors: [
            COLOR_PALETTES.palette2.first,
            COLOR_PALETTES.palette2.second,
            COLOR_PALETTES.palette2.accent,
            COLOR_PALETTES.palette2.lightGrey,
            COLOR_PALETTES.palette2.darkDarkGreen,
            COLOR_PALETTES.palette2.darkGreen,
            COLOR_PALETTES.palette2.green,
            COLOR_PALETTES.palette2.grey,
            COLOR_PALETTES.palette2.darkGrey,
            COLOR_PALETTES.palette2.description,
            COLOR_PALETTES.palette2.yellow,
            COLOR_PALETTES.palette2.red,
            COLOR_PALETTES.palette2.navigation,
        ],
    },
    {
        id: "palette3",
        colors: [
            COLOR_PALETTES.palette3.first,
            COLOR_PALETTES.palette3.second,
            COLOR_PALETTES.palette3.accent,
            COLOR_PALETTES.palette3.lightGrey,
            COLOR_PALETTES.palette3.darkDarkGreen,
            COLOR_PALETTES.palette3.darkGreen,
            COLOR_PALETTES.palette3.green,
            COLOR_PALETTES.palette3.grey,
            COLOR_PALETTES.palette3.darkGrey,
            COLOR_PALETTES.palette3.description,
            COLOR_PALETTES.palette3.yellow,
            COLOR_PALETTES.palette3.red,
            COLOR_PALETTES.palette3.navigation,
        ],
    },
    {
        id: "palette4",
        colors: [
            COLOR_PALETTES.palette4.first,
            COLOR_PALETTES.palette4.second,
            COLOR_PALETTES.palette4.accent,
            COLOR_PALETTES.palette4.lightGrey,
            COLOR_PALETTES.palette4.darkDarkGreen,
            COLOR_PALETTES.palette4.darkGreen,
            COLOR_PALETTES.palette4.green,
            COLOR_PALETTES.palette4.grey,
            COLOR_PALETTES.palette4.darkGrey,
            COLOR_PALETTES.palette4.description,
            COLOR_PALETTES.palette4.yellow,
            COLOR_PALETTES.palette4.red,
            COLOR_PALETTES.palette4.navigation,
        ],
    },
];

const ColorPaletteSelector = ({selectedPalette, onSelectPalette}) => {
    const handleSelectPalette = (paletteId) => {
        onSelectPalette(paletteId);
        window.location.reload();
    };

    return (
        <ColorPaletteWrapper>
            {colorPalettes.map((palette) => (
                <ColorPaletteOption key={palette.id}>
                    {palette.colors.map((color, index) => (
                        <ColorCircle
                            key={index}
                            color={color}
                            onClick={() => handleSelectPalette(palette.id)}
                            name={color}
                            style={{
                                border:
                                    selectedPalette === palette.id
                                        ? `2px solid ${COLORS.first}`
                                        : "none",
                            }}
                        />
                    ))}
                    <SelectButton onClick={() => handleSelectPalette(palette.id)}>
                        Select
                    </SelectButton>
                </ColorPaletteOption>
            ))}
        </ColorPaletteWrapper>
    );
};

export default ColorPaletteSelector;

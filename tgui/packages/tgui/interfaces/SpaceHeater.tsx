import { T0C } from '../constants';
import { useBackend } from '../backend';
import { Button, Knob, Section, LabeledControls, LabeledList } from '../components';
import { Window } from '../layouts';
import { BooleanLike } from 'common/react';

type Data = {
  temp: number;
  minTemp: number;
  maxTemp: number;
  cell: BooleanLike;
  power: BooleanLike;
};

export const SpaceHeater = (props) => {
  const { act, data } = useBackend<Data>();

  const { temp, minTemp, maxTemp, cell, power } = data;

  return (
    <Window width={300} height={250} resizable>
      <Window.Content>
        <Section title="Status">
          <LabeledList>
            <LabeledList.Item label="Target Temperature">
              {temp} K ({temp - T0C}&deg; C)
            </LabeledList.Item>
            <LabeledList.Item label="Current Charge">
              {power}% {!cell && '(No Cell Inserted)'}
            </LabeledList.Item>
          </LabeledList>
        </Section>
        <Section title="Controls">
          <LabeledControls>
            <LabeledControls.Item label="Thermostat">
              <Knob
                animated
                value={temp - T0C}
                minValue={minTemp - T0C}
                maxValue={maxTemp - T0C}
                unit="C"
                onChange={(_, val) => act('temp', { newtemp: val + T0C })}
              />
            </LabeledControls.Item>
            <LabeledControls.Item label="Cell">
              {cell ? (
                <Button
                  icon="eject"
                  content="Eject Cell"
                  onClick={() => act('cellremove')}
                />
              ) : (
                <Button
                  icon="car-battery"
                  content="Insert Cell"
                  onClick={() => act('cellinstall')}
                />
              )}
            </LabeledControls.Item>
          </LabeledControls>
        </Section>
      </Window.Content>
    </Window>
  );
};

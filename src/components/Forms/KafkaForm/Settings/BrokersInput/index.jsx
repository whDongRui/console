/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { get } from 'lodash'
import { ObjectInput, ArrayInput, NumberInput } from 'components/Inputs'
import { Input } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class BrokersInput extends React.Component {
  onChange = (value = {}) => {
    const Brokers = value
      .map(({ Host = '', Port = '' }) => `${Host.replace(/,/g, '')}:${Port}`)
      .join(',')
    this.props.onChange(Brokers)
  }

  render() {
    const brokers = get(this.props, 'value', '')
      .split(',')
      .map(broker => {
        const [, Host = '', Port = ''] = broker.match(/(.*):(.*)$/) || []
        return {
          Port,
          Host,
        }
      })

    return (
      <ArrayInput
        addText={t('Add Service Address')}
        itemType="object"
        value={brokers}
        onChange={this.onChange}
      >
        <ObjectInput className={styles.address}>
          <Input
            name="Host"
            className={styles.host}
            placeholder={`${t('eg.')} 192.168.1.10`}
          />
          <NumberInput
            className={styles.port}
            placeholder="9092"
            name="Port"
            min={0}
            max={65535}
            integer
          />
        </ObjectInput>
      </ArrayInput>
    )
  }
}

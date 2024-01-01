import React from "react";
import {Avatar, List} from "@douyinfe/semi-ui";
import FormattedTime from "src/components/formateDate.jsx"
export const comment = ({data}) => {
  return(
      <div style={{ padding: 12, border: '1px solid var(--semi-color-border)', margin: 12 }}>
          <List
              dataSource={data}
              renderItem={item => (
                  <List.Item
                      header={<Avatar color="blue">{item.name}</Avatar>}
                      main={
                          <div>
                              <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.name}</span>
                              {item.text}
                              <FormattedTime num={item.time}/>
                          </div>
                      }

                  />
              )}
          />
      </div>
  )
}
import React from 'react'
import { Grid } from 'semantic-ui-react'
import AccountsComponent from '../../components/accounts/AccountsComponent.jsx'

const gridStyle = {
  height: '100vh'
}

const AccountsPage = () => (
  <Grid centered columns={16} verticalAlign='middle' style={gridStyle}>
    <Grid.Row>
      <Grid.Column width={8}>
        <AccountsComponent />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default AccountsPage

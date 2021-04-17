import { Button, Card, CardActions, CardContent, CardHeader, Divider, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(() => ({
  root: {},
}))


const LinkCard = ({ className, ...rest }) => {
  const classes = useStyles()

  return (
    <Card className={clsx(classes.root, className)}>
      {rest.title && <CardHeader title={rest.title} />}
      {rest.title && <Divider />}
      <CardContent>{rest.children}</CardContent>
      {rest.action && <Divider />}
      {rest.action && (
        <CardActions>
          <Button onClick={rest.action} color="primary" fullWidth variant="text">
            {rest.actionTitle}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default LinkCard
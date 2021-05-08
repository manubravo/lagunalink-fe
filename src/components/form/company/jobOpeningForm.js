import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { actions } from '../../../redux/company'

const schema = yup.object().shape({
  position: yup.string().required(),
  description: yup.string().required(),
  responsibilities: yup.string().required(),
  conditions: yup.string().required(),
  qualification: yup.string().required(),
  prevExperience: yup.string().required(),
  hiringDate: yup.string().required(),
})

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}))

export const JobOpeningForm = props => {
  const {
    hide,
    companyName,
    position,
    description,
    responsibilities,
    conditions,
    qualification,
    prevExperience,
    hiringDate,
    viewer,
  } = props
  const classes = useStyles()
  const { control, handleSubmit, errors, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()

  setValue('company', companyName)
  setValue('position', position)
  setValue('description', description)
  setValue('responsibilities', responsibilities)
  setValue('conditions', conditions)
  setValue('qualification', qualification)
  setValue('prevExperience', prevExperience)
  setValue('hiringDate', hiringDate)

  const onSubmit = data => {
    dispatch(actions.addJobOpening(data))
    reset()
    hide()
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} hidden={true}>
          <Controller
            as={TextField}
            variant="outlined"
            defaultValue=""
            size="small"
            label="Empresa"
            name="company"
            control={control}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Posicion"
            name="position"
            control={control}
            error={Boolean(errors.position)}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            defaultValue=""
            variant="outlined"
            size="small"
            multiline
            label="Descripcion"
            name="description"
            control={control}
            error={Boolean(errors.description)}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            variant="outlined"
            defaultValue=""
            size="small"
            label="Responsabilidades"
            name="responsibilities"
            multiline
            error={Boolean(errors.responsibilities)}
            control={control}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            defaultValue=""
            variant="outlined"
            size="small"
            multiline
            label="Condiciones"
            name="conditions"
            control={control}
            error={Boolean(errors.conditions)}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Titulacion requerida"
            name="qualification"
            control={control}
            error={Boolean(errors.qualification)}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <Controller
            as={TextField}
            defaultValue=""
            type="date"
            variant="outlined"
            size="small"
            label="Fecha prevista de contratación"
            name="hiringDate"
            control={control}
            error={Boolean(errors.hiringDate)}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            as={TextField}
            defaultValue=""
            variant="outlined"
            size="small"
            label="Experiencia requerida"
            name="prevExperience"
            control={control}
            error={Boolean(errors.prevExperience)}
            fullWidth
            inputProps={{ readOnly: viewer }}
          />
        </Grid>
        <Grid item xs={12} container hidden={viewer} justify={'space-around'}>
          <Button color="primary" variant="text" onClick={props.hide}>
            Cancelar
          </Button>
          <Button color="primary" variant="text" type="submit">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

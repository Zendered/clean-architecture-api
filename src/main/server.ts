import 'module-alias/register'
import { app } from '@src/main/config/'

app.listen(5000, () => {
  console.log('Server ON!')
})

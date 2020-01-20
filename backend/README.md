### Configuração MongoDB

Configure o arquivo src/index.js
altere <usuario> para o usuário que você configurou e a <senha> para a senha que você configurou.

```sh
mongoose.connect('mongodb+srv://<usuario>:<senha>@cluster0-3wvmv.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
```

### Para iniciar o sistema utilize o comando abaixo

```sh
cd beckend
yarn dev
```

## Backend
- [x] routes
- [x] models
- [x] controllers
- [x] utils
- [x] cors
- [x] socketio

## Routes
- [x] index
- [x] show
- [x] store
- [x] update
- [x] destroy

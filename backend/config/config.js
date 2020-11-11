const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string:'mongodb+srv://username_admin:23011770Vi@clusterapi.4cmme.mongodb.net/clusterapi?retryWrites=true&w=majority',
                jwt_pass: 'teste123',
                expires_in:'7d'
            }
         
        case 'hml':
    
            return {
                bd_string:'mongodb+srv://username_admin:23011770Vi@clusterapi.4cmme.mongodb.net/clusterapi?retryWrites=true&w=majority',
                jwt_pass: 'teste123',
                expires_in:'7d'
            }

        case 'prod':
        
        return {
            bd_string:'mongodb+srv://username_admin:23011770Vi@clusterapi.4cmme.mongodb.net/clusterapi?retryWrites=true&w=majority',
            jwt_pass: 'teste123',
            expires_in:'7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
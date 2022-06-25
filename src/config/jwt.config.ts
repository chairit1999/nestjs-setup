export default () => ({
  accessTokenExpire: Number(process.env.AC_TOKEN_EXPIRE) || 600,
  issuer: 'myproject',
});

const smsc = process.env.smsc as unknown as {
  login: string,
  password: string
}

export { smsc }

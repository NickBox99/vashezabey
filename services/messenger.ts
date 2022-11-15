class Messenger {
  constructor(private api: string) {}

  telegram = {
    waiterCall: async ({ table, cardId } : { table: string, cardId: number | null }) => {
      const message = `[Бот]: Стол: ${table}. Пользователь: ${cardId ?? "Не авторизирован"}`;
      await fetch(`${this.api}${message}`);
    }
  };
}

export { Messenger };

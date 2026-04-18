import type ServiceProvider from '@strav/kernel/core/service_provider'
import { ConfigProvider, EncryptionProvider } from '@strav/kernel/providers'
import { DatabaseProvider } from '@strav/database/providers'
import { HttpProvider, SessionProvider } from '@strav/http'
import { PagesProvider, ViewProvider } from '@strav/view'
import { BrainProvider } from '@strav/brain'
import { MailProvider } from '@strav/signal'

export const providers: ServiceProvider[] = [
  new ConfigProvider(),
  new HttpProvider(),
  new DatabaseProvider(),
  new EncryptionProvider(),
  new SessionProvider(),
  new BrainProvider(),
  new ViewProvider(),
  new MailProvider(),
  new PagesProvider(),
]
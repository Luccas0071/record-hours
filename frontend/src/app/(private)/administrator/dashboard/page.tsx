import AdministratorPage from "@/components/administrator/AdministratorPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Administrador",
  description: "Painel de controle usuário.",
}

export default function Page() {
  return (
    <AdministratorPage />
  )
}


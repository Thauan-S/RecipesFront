import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ResetPasswordModal } from "@/pages/login/components/ResetPasswordModal";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  RotateCcwKey,
} from "lucide-react";
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarRail>
        <SidebarTrigger className="relative ml-5" />
      </SidebarRail>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Minhas Receitas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
               <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                      <a>
                        <RotateCcwKey />
                        <ResetPasswordModal>
                  <a
                  >
                    Mudar senha 
                  </a>
                </ResetPasswordModal>

                      </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

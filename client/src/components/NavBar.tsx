import { BarChart3, Users, UserPlus, FileText, LogOut, Menu, DatabaseZapIcon, UserCog } from 'lucide-react';
import { LogoutAndDeleteToken } from '@/services/LogOut';
import { useAuth } from '@/auth/AuthContext';
import { NavLink } from 'react-router';
import { useState } from 'react';

export default function NavBar() {
  const { setIsAuthenticated } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    LogoutAndDeleteToken()
      .then(res => {
        console.log(res);
        setIsAuthenticated(false);
      })
  }

  const navigationItems = [
    {
      title: 'Dashboard',
      to: 'dashboard',
      icon: BarChart3,
      description: 'Panel de control'
    },
    {
      title: 'Todos los clientes',
      to: '/',
      icon: Users,
      description: 'Gestión de clientes'
    },
    {
      title: 'Actualizacion Masiva',
      to: 'actualizacion-masiva',
      icon: UserCog,
      description: 'Actualizacion de clientes Masiva'
    },
    {
      title: 'Clientes Nuevos',
      to: 'clientes-nuevos',
      icon: UserPlus,
      description: 'Nuevos registros'
    },
    {
      title: 'Reportes',
      to: 'reportes',
      icon: FileText,
      description: 'Informes y análisis'
    },
    {
      title: 'Tus Datos',
      to: 'tus-datos',
      icon: DatabaseZapIcon,
      description: 'Verificación de datos'
    }
  ];

  return (
    <nav className={`
      ${isCollapsed ? 'w-16' : 'w-64'} 
      bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out
      flex flex-col h-screen relative
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-800">Sistema</h2>
                <p className="text-xs text-gray-500">Segmentación</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
          >
            <Menu size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4">
        <ul className="space-y-2 px-3">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  title={item.title}
                  className={({ isActive }) => `
                    group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <div className={`
                    flex-shrink-0 w-5 h-5 flex items-center justify-center
                    ${isCollapsed ? 'mx-auto' : ''}
                  `}>
                    <IconComponent size={20} />
                  </div>

                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {item.title}
                      </div>
                      <div className="text-xs opacity-75 truncate">
                        {item.description}
                      </div>
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer - Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => handleClick()}
          title="Cerrar Sesión"
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl
            text-gray-600 hover:bg-red-50 hover:text-red-600
            transition-all duration-200 group
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">Cerrar Sesión</div>
              <div className="text-xs opacity-75">Salir del sistema</div>
            </div>
          )}
        </button>
      </div>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full top-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Sistema de Segmentación
          </div>
        </div>
      )}
    </nav>
  )
}

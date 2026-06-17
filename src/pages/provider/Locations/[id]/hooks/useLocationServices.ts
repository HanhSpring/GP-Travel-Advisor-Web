import { useState, useEffect } from 'react';
import { getPlaceServicesByType } from '../../../../../services/order.service';
import { PlaceServiceItem, ServiceEditorState, ServiceKind, TabKey } from '../types';
import { normalizeServiceItem, createId } from '../utils';

export const useLocationServices = (id: string | undefined, placeId: string | undefined, activeTab: TabKey) => {
  const [freeServices, setFreeServices] = useState<PlaceServiceItem[]>([]);
  const [paidServices, setPaidServices] = useState<PlaceServiceItem[]>([]);
  const [menuItems, setMenuItems] = useState<PlaceServiceItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [serviceEditor, setServiceEditor] = useState<ServiceEditorState | null>(null);
  const [serviceDraft, setServiceDraft] = useState({
    id: '', name: '', description: '', price: '', isActive: true,
  });

  useEffect(() => {
    const fetchServices = async () => {
      const targetPlaceId = placeId || id;
      if (!targetPlaceId || activeTab !== 'Dịch vụ') return;

      try {
        setServicesLoading(true);
        setServicesError(null);
        const rawServices = await getPlaceServicesByType(targetPlaceId);
        const payload = rawServices && typeof rawServices === 'object' ? (rawServices as Record<string, unknown>) : {};
        const nested = (payload.data as Record<string, unknown> | undefined) ?? {};
        const free = Array.isArray(payload.freeServices) ? payload.freeServices : Array.isArray(nested.freeServices) ? (nested.freeServices as unknown[]) : [];
        const paid = Array.isArray(payload.paidServices) ? payload.paidServices : Array.isArray(nested.paidServices) ? (nested.paidServices as unknown[]) : [];
        const menu = Array.isArray(payload.menuItems) ? payload.menuItems : Array.isArray(nested.menuItems) ? (nested.menuItems as unknown[]) : [];

        setFreeServices(free.map((item) => normalizeServiceItem(item, 'free')));
        setPaidServices(paid.map((item) => normalizeServiceItem(item, 'paid')));
        setMenuItems(menu.map((item) => normalizeServiceItem(item, 'paid')));
      } catch (err) {
        setServicesError(err instanceof Error ? err.message : 'Không thể tải dịch vụ');
        setFreeServices([]);
        setPaidServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    void fetchServices();
  }, [activeTab, id, placeId]);

  const openServiceEditor = (kind: ServiceKind, service?: PlaceServiceItem) => {
    setServiceEditor({ kind, mode: service ? 'edit' : 'create' });
    setServiceDraft({
      id: service?.id || '',
      name: service?.name || '',
      description: service?.description || '',
      price: service?.price !== null && service?.price !== undefined ? String(service.price) : '',
      isActive: service?.isActive ?? true,
    });
  };

  const closeServiceEditor = () => {
    setServiceEditor(null);
    setServiceDraft({ id: '', name: '', description: '', price: '', isActive: true });
  };

  const saveService = () => {
    if (!serviceEditor) return;
    const trimmedName = serviceDraft.name.trim();
    if (!trimmedName) {
      window.alert('Vui lòng nhập tên dịch vụ');
      return;
    }

    const nextService: PlaceServiceItem = {
      id: serviceDraft.id || createId(serviceEditor.kind),
      name: trimmedName,
      description: serviceDraft.description.trim(),
      price: serviceEditor.kind === 'paid'
        ? (() => {
            const numericPrice = Number(String(serviceDraft.price).replace(/[^\d.-]/g, ''));
            return Number.isFinite(numericPrice) ? numericPrice : 0;
          })()
        : null,
      isActive: serviceDraft.isActive,
    };

    if (serviceEditor.kind === 'free') {
      setFreeServices((current) => serviceEditor.mode === 'edit'
        ? current.map((item) => (item.id === nextService.id ? nextService : item))
        : [...current, nextService]);
    } else {
      setPaidServices((current) => serviceEditor.mode === 'edit'
        ? current.map((item) => (item.id === nextService.id ? nextService : item))
        : [...current, nextService]);
    }

    closeServiceEditor();
  };

  const deleteService = (kind: ServiceKind, serviceId: string) => {
    if (kind === 'free') {
      setFreeServices((current) => current.filter((item) => item.id !== serviceId));
    } else {
      setPaidServices((current) => current.filter((item) => item.id !== serviceId));
    }
  };

  const togglePaidService = (serviceId: string) => {
    setPaidServices((current) => current.map((item) => item.id === serviceId ? { ...item, isActive: !item.isActive } : item));
  };

  return {
    freeServices, paidServices, menuItems, setMenuItems,
    servicesLoading, servicesError,
    serviceEditor, serviceDraft, setServiceDraft,
    openServiceEditor, closeServiceEditor, saveService, deleteService, togglePaidService
  };
};

import React, { useRef } from 'react';
import AuditTable from './audits-table';

export default function AuditsContainer() {
  const auditTableRef = useRef();

  return (
    <div className="col">
      <AuditTable ref={auditTableRef} />
    </div>
  );
}
